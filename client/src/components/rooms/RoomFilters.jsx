const RoomFilters = ({ filterType, setFilterType }) => {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Solo', value: 'solo' },
    { label: 'Double', value: 'double' },
    { label: 'Luxury', value: 'luxury' },
  ];

  return (
    <div className="room-filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setFilterType(filter.value)}
          className={`btn-filter ${filterType === filter.value ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default RoomFilters;
