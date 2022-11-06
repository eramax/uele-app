import { useState, useEffect } from "react";

export default function InputBinding() {
  const [count, setCount] = useState(0);
  let inputRef = null;

  function change(e) {
    //inputRef.value = e.target.value.length;
    setCount(e.target.value.length);
  }

  useEffect(() => {
    console.log("input", inputRef);
  });

  return (
    <div>
      <h1>Counters that update separately</h1>
      <input onInput={change} type="text" />
      <input readonly ref={(e) => (inputRef = e)} type="text" value={count} />

      <button
        type="button"
        ref={(e, props) => {
          console.log(e, props);
          e.onclick = () => {
            console.log("hi");
            console.log(e, props);
          };
        }}
      >
        Try {count}
      </button>
    </div>
  );
}
