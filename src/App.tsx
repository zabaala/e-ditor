import React, {FunctionComponent} from 'react';
import './App.css';
import Editor from "./Editor";

const App: FunctionComponent = () => {
  return (
    <div className="root">
     <Editor />
    </div>
  );
}

export default App;