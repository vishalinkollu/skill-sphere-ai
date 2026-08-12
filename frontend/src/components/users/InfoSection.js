import "./InfoSection.css";

const InfoSection = ({
  title,
  items,
  field,
}) => {
  return (
    <div className="info-section">
      <h3>{title}</h3>

      <div className="tags-container">
        {items?.length ? (
          items.map((item, index) => (
            <span
              key={index}
              className="tag"
            >
              {item[field]}
            </span>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};

export default InfoSection;