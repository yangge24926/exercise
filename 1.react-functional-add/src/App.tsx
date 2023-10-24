import React, { useState } from "react";
import "./App.css";

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */
async function add(...inputs: number[]) {
  // 远程的加法对于前端而言应该是未知解耦的，所以这块不能使用Promise.all处理。
  // const promises = inputs.map(input => addRemote(input, 0));
  // const results = await Promise.all(promises);
  // return results.reduce((total, current) => total + current, 0);
  let result = inputs[0];
  for (let i = 0; i < inputs.length; i++) {
    const nextInput = inputs[i + 1];
    if (nextInput !== undefined) {
      const remoteResult = await addRemote(result, nextInput);
      result = remoteResult;
    }
  }

  return result;
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleAddClick = async () => {
    const inputNumbers = inputValue
      .split(",")
      .map((num) => Number(num))
      .filter((num) => !isNaN(num));
    const sum = inputNumbers.length ? await add(...inputNumbers) : null;
    setResult(sum);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input
          type="text"
          placeholder="请输入要相加的数字（如1,3,4,5,6）"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddClick}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：<span>{result === null ? "无" : result}</span>
        </p>
      </section>
    </div>
  );
}

export default App;
