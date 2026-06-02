function ShareButton() {
  return (
    <button style={{ position: "absolute", top: 12 + "px", left: 12 + "px", width: 48 + "px", height: 42 + "px", borderRadius: 12 + "px", fontSize: 24 + "px", margin: 0, display: "flex", justifyContent: "center", alignItems: "center" }} className="btn btn-purple">
      <i className="fa-solid fa-share"></i>
    </button>
  );
}

export default ShareButton;
