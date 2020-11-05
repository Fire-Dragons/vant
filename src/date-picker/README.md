# AddressEdit

### Install

```js
import Vue from 'vue';
import { AddressEdit } from 'vant';

Vue.use(AddressEdit);
```

## Usage

### Basic Usage

```html
<van-datetime-picker
  v-model="currentYear"
  title="年份选择"
  :min-year="minYear"
  :max-year="maxYear"
/>
```

```js
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      minYear: 2015,
      maxYear: 2025
    };
  },
};
```

## API

### Props

| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| area-list | Area List | _object_ | - |
| area-columns-placeholder | placeholder of area columns | _string[]_ | `[]` |
| area-placeholder `v2.6.1` | placeholder of area input field | _string_ | `Area` |
| address-info | Address Info | _AddressInfo_ | `{}` |
| search-result | Address search result | _SearchResult[]_ | `[]` |
| show-postal | Whether to show postal field | _boolean_ | `false` |
| show-delete | Whether to show delete button | _boolean_ | `false` |
| show-set-default | Whether to show default address switch | _boolean_ | `false` |
| show-search-result | Whether to show address search result | _boolean_ | `false` |
| show-area | Whether to show area cell | _boolean_ | `true` |
| show-detail | Whether to show detail field | _boolean_ | `true` |
| disable-area `v2.5.0` | Whether to disable area select | _boolean_ | `false` |
| save-button-text | Save button text | _string_ | `Save` |
| delete-button-text | Delete button text | _string_ | `Delete` |
| detail-rows | Detail input rows | _number \| string_ | `1` |
| detail-maxlength | Detail maxlength | _number \| string_ | `200` |
| is-saving | Whether to show save button loading status | _boolean_ | `false` |
| is-deleting | Whether to show delete button loading status | _boolean_ | `false` |
| tel-validator | The method to validate tel | _(tel: string) => boolean_ | - |
| tel-maxlength `v2.10.0` | Tel maxlength | _number \| string_ | - |
| postal-validator | The method to validate postal | _(tel: string) => boolean_ | - |
| validator | Custom validator | _(key, val) => string_ | - |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| save | Triggered when click save button | content：form content |
| focus | Triggered when focus field | key: field name |
| delete | Triggered when confirm delete | content：form content |
| cancel-delete | Triggered when cancel delete | content：form content |
| select-search | Triggered when select search result | value: search content |
| click-area `v2.5.9` | Triggered when click area | - |
| change-area | Triggered when change area | values: area values |
| change-detail | Triggered when address detail changed | value: address detail |
| change-default | Triggered when switch default address | value: checked |

