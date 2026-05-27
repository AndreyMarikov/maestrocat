import { Link } from "react-router-dom";

function LearnTheoryButton() {
  return (
    <Link style={{
      position: "absolute",
      left: 12 + "px",
      top: 12 + "px",
      zIndex: 9999,
      backgroundColor: "var(--white)",
      width: 42 + "px",
      height: 42 + "px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 9999 + "px",
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      fontSize: 24 + "px"
    }}>
      <i className="bi bi-stars"></i>
    </Link>
  );
}

export default LearnTheoryButton;
