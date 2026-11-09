function CourseCard({
  formation,
  onSupprimer,
  suppressionEnCours
}) {
  return (
    <article className="course-card">

      <h3>{formation.nom}</h3>

      <button
        type="button"
        onClick={() => onSupprimer(formation.id)}
        disabled={suppressionEnCours}
      >
        {suppressionEnCours
          ? "Suppression..."
          : "Supprimer"}
      </button>

    </article>
  );
}

export default CourseCard;
