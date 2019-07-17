<template>
  <div class="hello">
    <select :value="selectedBadge" @input="e => updateBadge(e.target.value)">
      <option v-for="badge in badges" :key="badge.code" :value="badge.code">
        {{ badge.name }}
      </option>
    </select>

    <form-generator :schema="currentBadge.fields" v-model="nomination" />
    {{ nomination }}
    <button v-on:click="submit" type="button">Click Me</button>
  </div>
</template>

<script>
import FormGenerator from "../components/FormGenerator";

import fb from "../db.js";
// const SHEET_URL =
("https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbzIxwzO1p326DEhLDkA2yiKSwW3YR0LHN1nUeGC236f9Ta6q_U/exec");

const BADGES = [
  {
    code: "RANGLE_PODCAST",
    name: "Podcast",
    description:
      "This badge is for any Rangle employee who has participated in recording a podcast for Rangle.  This is a one-time award and the Rangle employee must be employed with Rangle to receive this badge.",
    icon: "../assets/podcast.png",
    fields: [
      {
        fieldType: "TextField",
        name: "fullName",
        label: "Full Name"
      },
      {
        fieldType: "TextField",
        name: "department",
        label: "Department"
      },
      {
        fieldType: "DateField",
        name: "podcastDate",
        label: "Podcast Date"
      },
      {
        fieldType: "TextField",
        name: "podcastTopic",
        label: "Podcast Topic"
      },
      {
        fieldType: "TextField",
        name: "nomineeName",
        label: "Nominee Name (if different from above)"
      }
    ]
  },
  {
    code: "RANGLE_CLIENT_REFERRAL",
    name: "Client Referral",
    description:
      "This badge is for any Rangle employee who has referred business to Rangle and this business has become a Rangle client as a result. Rangle employees are eligible to receive this award more than once based on referrals who are signed as new clients of Rangle.  Employee must be employed by Rangle in order to receive the badge.",
    icon: "../assets/podcast.png",
    fields: [
      {
        fieldType: "TextField",
        name: "fullName",
        label: "Full Name"
      },
      {
        fieldType: "TextField",
        name: "department",
        label: "Department"
      },

      {
        fieldType: "TextField",
        name: "clientReferred",
        label: "Client Referred"
      },
      {
        fieldType: "DateField",
        name: "clientSignedDate",
        label: "Date Client Project Signed"
      },
      {
        fieldType: "TextField",
        name: "nomineeName",
        label: "Nominee Name (if different from above)"
      }
    ]
  }
];
export default {
  name: "HelloWorld",
  components: { FormGenerator },
  props: {
    msg: String
  },
  data() {
    return {
      selectedBadge: "RANGLE_PODCAST",
      badges: [...BADGES],
      nomination: {
        fullName: ""
      }
    };
  },
  created() {
    this.updateBadge(this.selectedBadge);
  },
  computed: {
    currentBadge() {
      return this.badges.find(n => n.code === this.selectedBadge) || [];
    }
  },
  methods: {
    updateBadge(value) {
      this.selectedBadge = value;
      let fields = this.currentBadge.fields.reduce((acc, value) => {
        return {
          ...acc,
          [value.name]: ""
        };
      }, {});
      this.nomination = fields;
    },
    submit(e) {
      let nomination = { ...this.nomination, badge: this.selectedBadge };
      Object.keys(nomination).forEach(key => {
        if (nomination[key] === undefined) {
          delete nomination[key];
        }
      });
      e.preventDefault();
      fb.db
        .collection(`nominations`)
        .doc()
        .set(nomination)
        .then(r => {
          console.log("weee", r);
          fb.db
            .collection(`nominations`)
            .get()
            .then(n => {
              n.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
              });
            });
        })
        .then(null, err => {
          console.log("sad", err);
        });
      /* fetch(`${SHEET_URL}?fullName=bob&someName=jane&anotherField=doe`, {
        method: "GET",
        mode: 'cors',
        data: {
          fullName: "test",
        }
      })
        .then(r => {
          return r.json();
        })
        .then(r => {
          console.log("rawr", r);
        })
        .catch(e => {
          console.log("err", e);
        });*/
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
