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
  );
};
export default App;
