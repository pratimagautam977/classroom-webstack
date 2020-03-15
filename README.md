classroom-webstack

Tooltip on hover for Nav Links 

https://reactstrap.github.io/components/tooltips/#app

Uncontrolled Tooltip

For the most basic use-case an uncontrolled component can provide the functionality wanted without the need to manage/control the state of the component. UncontrolledTooltip does not require isOpen nor toggle props to work.

```js
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

export default function Example() {
  return (
    <div>
      <p>Somewhere in here is a <span style={{textDecoration: "underline", color:"blue"}} href="#" id="UncontrolledTooltipExample">tooltip</span>.</p>
      <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
        Hello world!
      </UncontrolledTooltip>
    </div>
  );
}
```