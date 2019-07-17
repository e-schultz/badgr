<template>
  <div>
    <label>{{ label }}</label>

    <input
      type="date"
      :name="name"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "DateField",
  props: ["placeholder", "label", "name", "value"]
};
</script>
