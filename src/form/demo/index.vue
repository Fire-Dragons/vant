<template>
  <demo-section>
    <basic-usage />
    <validate-rules />
    <field-type />
    <test />
  </demo-section>
</template>

<script>
import BasicUsage from './BasicUsage';
import ValidateRules from './ValidateRules';
import FieldType from './FieldType';
import test from './test';


export default {
  components: {
    BasicUsage,
    FieldType,
    ValidateRules,
    test,
  },
};
</script>
