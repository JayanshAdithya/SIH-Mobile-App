import React, { useState, useEffect } from 'react';

interface SearchBarProps {
    items: string[]; 
}

const SearchBar: React.FC<SearchBarProps> = ({ items }) => {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState<string[]>(items);
    const [sortOption, setSortOption] = useState('ascending'); // Default sort option

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);
    };

    useEffect(() => {
        const results = items.filter((item) =>
            item.toLowerCase().includes(query) && item.endsWith('.pdf')
        );

        // Sort based on selected option
        results.sort((a, b) => {
            if (sortOption === 'ascending') {
                return a.localeCompare(b);
            } else if (sortOption === 'descending') {
                return b.localeCompare(a);
            } 
            // Add more sorting options here if needed
            return 0; // Default case
        });

        setFilteredItems(results);
    }, [query, items, sortOption]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Search for PDF file names..."
                value={query}
                onChange={handleSearch}
                style={styles.input}
            />
            <select onChange={handleSortChange} value={sortOption} style={styles.select}>
                <option value="ascending">Sort Ascending</option>
                <option value="descending">Sort Descending</option>
            </select>
            {/* <button style={styles.button}>
                Apply Filter
            </button> */}
            <ul style={styles.results}>
                {filteredItems.map((item, index) => (
                    <li key={index} style={styles.item}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    select: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        display: 'block', 
        width: '100%', 
        padding: '8px 12px',
        margin: '0 auto', 
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    results: {
        listStyleType: 'none',
        padding: '0',
    },
    item: {
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
    },
};

export default SearchBar;



// import React, { useState, useEffect } from 'react';

// interface SearchBarProps {
//     items: string[]; 
// }

// const SearchBar: React.FC<SearchBarProps> = ({ items }) => {
//     const [query, setQuery] = useState('');
//     const [filteredItems, setFilteredItems] = useState<string[]>(items);
//     const [sortAscending, setSortAscending] = useState(true);

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value.toLowerCase();
//         setQuery(value);
//     };

//     useEffect(() => {
//         const results = items.filter((item) =>
//             item.toLowerCase().includes(query) && item.endsWith('.pdf')
//         );

//         results.sort((a, b) => {
//             if (sortAscending) {
//                 return a.localeCompare(b);
//             } else {
//                 return b.localeCompare(a);
//             }
//         });

//         setFilteredItems(results);
//     }, [query, items, sortAscending]);

//     const toggleSortOrder = () => {
//         setSortAscending(prev => !prev);
//     };

//     return (
//         <div style={styles.container}>
//             <input
//                 type="text"
//                 placeholder="Search for PDF file names..."
//                 value={query}
//                 onChange={handleSearch}
//                 style={styles.input}
//             />
//             <button onClick={toggleSortOrder} style={styles.button}>
//                 Sort {sortAscending ? 'Descending' : 'Ascending'}
//             </button>
//             <ul style={styles.results}>
//                 {filteredItems.map((item, index) => (
//                     <li key={index} style={styles.item}>
//                         {item}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         width: '100%',
//         maxWidth: '400px',
//         margin: '0 auto',
//         padding: '10px',
//         border: '1px solid #ddd',
//         borderRadius: '4px',
//         backgroundColor: '#f9f9f9',
//     },
//     input: {
//         width: '100%',
//         padding: '8px',
//         marginBottom: '10px',
//         border: '1px solid #ccc',
//         borderRadius: '4px',
//     },
//     button: {
//         display: 'block', 
//         width: '100%', 
//         padding: '8px 12px',
//         margin: '0 auto', 
//         border: 'none',
//         borderRadius: '4px',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         cursor: 'pointer',
//     },
//     results: {
//         listStyleType: 'none',
//         padding: '0',
//     },
//     item: {
//         padding: '5px 0',
//         borderBottom: '1px solid #ddd',
//     },
// };

// export default SearchBar;