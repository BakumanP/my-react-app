import React from 'react';

interface AppProp {
  id?: number;
  name: string;
}

const App: React.FC<AppProp> = () => {
  return (
    <>
      <p>hello,world111!</p>
    </>
    {/** test代码在安卓编写  */}
  );
};
export default App;