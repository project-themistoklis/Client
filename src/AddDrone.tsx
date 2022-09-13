import "./App.css";

function AddDrone(props: any) {
  const back = async () => {
    props.back();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={back}>Back</button>
      </header>
    </div>
  );
}

export default AddDrone;
