import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
}) => {
  return (
    <input
      className="search-input"
      placeholder="Search users..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;