function Construct(props) {
<<<<<<< HEAD
  const pad2 = (num) => String(num).padStart(2, "0");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <h2>The current date is:</h2>
        <h3>
          {props.info.year}-{pad2(props.info.month)}-{pad2(props.info.day)}
        </h3>
        <h2>The current time is:</h2>
        <h3>
          {pad2(props.info.hour)}:{pad2(props.info.min)} {props.info.tz}
        </h3>
=======
  return (
    <div className="App">
      <header className="App-header">
        <h1>Under construction</h1>
        <h2>Coming on (or before)</h2>
        <h2>
          Module: {props.info.module} Week: {props.info.week} Day:{" "}
          {props.info.day}
        </h2>
        <h2>
          by or <strong>WELL BEFORE</strong> {props.info.hour}:{props.info.min}{" "}
          Cohort Time
        </h2>
>>>>>>> main
      </header>
    </div>
  );
}

export default Construct;
