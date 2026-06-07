import styles from "./Filters.module.css";
import TypeBadge from "./TypeBadge";

function Filters({ types, setSelectedType, selectedType, search, order, onSearchChange, onOrderChange }) {
  return (
    <>
      <div className={styles['search-container']}>    
      <input className={styles['search-input']}
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search..." />
      <h4>Order By</h4>
      <select className={styles['order-select']} value={order} onChange={e => onOrderChange(e.target.value)}>
        <option value="az">A to Z</option>
        <option value="za">Z to A</option>
        <option value="high">Higher Number</option>
        <option value="low">Lower Number</option>
      </select>
      </div>
      <div className={styles['type-filter']}>
        <ul>
          {types.map(type => (
            <li key={type}>
              <button className={selectedType === type ? styles.active : ''}
                onClick={() => setSelectedType(type)}
              >
                <TypeBadge type={type} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Filters;
