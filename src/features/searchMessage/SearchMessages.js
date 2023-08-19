import styles from './css/searchMessages.module.scss';

import { AiOutlineSearch } from 'react-icons/ai';
import { DebounceInput } from 'react-debounce-input';

const SearchMessages = (props) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <div className={styles.s__searchOuterContainer}>
      <div className={styles.s__searchContainer}>
        <AiOutlineSearch className="mx-2" />
        <DebounceInput
          debounceTimeout={500}
          type="text"
          className={`${styles.s__input}`}
          value={searchQuery}
          placeholder={`Search `}
          onChange={(t) => {
            setSearchQuery(t.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchMessages;
