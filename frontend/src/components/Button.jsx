function Button({ texte, onClick, couleur }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: couleur || "#1a237e" }}
    >
      {texte}
    </button>
  );
}

export default Button;
