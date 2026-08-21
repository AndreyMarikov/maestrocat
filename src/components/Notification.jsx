function Notification() {
  return (
    <div style={{
      position: "fixed",
      top: 16 + "px",
      left: 50 + "%",
      translate: -50 + "%",
      backgroundColor: "var(--white)",
      borderRadius: 16 + "px",
      display: "flex",
      flexDirection: "column",
      gap: 6 + "px",
    }} className="notification">
      <div style={{
        display: "flex",
        gap: 6 + "px",
        alignItems: "center",
        width: "fit-content"
      }}>
        <i className="fa fa-pen-to-square"></i>
        <div style={{
          textAlign: "left",
          paddingRight: 6 + "px"
        }}>
          <h3 style={{ margin: 0, color: "hsl(0, 0%, 25%)" }}>Помогите нам улучшить ваш процесс обучения</h3>
          <p style={{ color: "hsl(0, 0%, 25%)" }}>Расскажите, чего вам не хватает или что можно улучшить.</p>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-around"
      }}>
        <button className="btn btn-green">Да</button>
        <button className="btn btn-secondary">не сейчас</button>
      </div>
    </div>
  );
}

export default Notification;
