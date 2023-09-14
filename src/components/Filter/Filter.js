import { Label, Input } from './Filter.styled';
import { AiOutlineFileSearch } from 'react-icons/ai';

export const Filter = ({ onChange, filter }) => {
  return (
    <Label>
      <AiOutlineFileSearch size={30} />
      <Input
        placeholder="Find contacts by name"
        type="text"
        value={filter}
        onChange={evt => onChange(evt.target.value)}
      />
    </Label>
  );
};
