<template>
  <div>
    <component
      v-for="(field, index) in schema"
      :key="field.name + index"
      :is="field.fieldType"
      :value="formData[field.name]"
      @input="updateForm(field.name, $event)"
      v-bind="field"
    ></component>
  </div>
</template>

<script>
import DateField from "./DateField";
import TextField from "./TextField";
export default {
  name: "FormGenerator",
  components: { TextField, DateField },
  props: ["schema", "value"],
  data() {
    return {
      formData: this.value || {}
    };
  },
  watch: {
    schema(val) {
      this.formData = this.value || {};
    }
  },
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    }
  }
};
</script>
