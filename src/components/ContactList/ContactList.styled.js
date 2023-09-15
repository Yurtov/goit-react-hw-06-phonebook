import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 25px;
`;

export const ContactItem = styled.li``;

export const Span = styled.span`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteBtn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Stub = styled.div`
  color: red;
`;
