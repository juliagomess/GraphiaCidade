import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.SafeAreaView`
  background-color: #32bb69;
  height: 65px;
`;

export const HeaderElements = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
`;

export const ScreenTitle = styled.Text`
  color: #47525e;
  font-size: 30px;
  margin-top: 10px;
  align-self: center;
`;

export const TitleArea = styled.View`
  height: 100px;
`;

export const ProblemTitle = styled.Text`
  color: #000;
  align-self: center;
  margin-top: 3px;
  font-size: 18px;
  font-weight: bold;
`;

export const TicketDescription = styled.Text`
  color: #fff;
  align-self: center;
  margin-top: 6px;
  font-size: 16px;
  margin-left: 19%;
`;

export const AllTicketsArea = styled.View`
  flex: 1;
  margin-bottom: 30px;
`;

export const TicketView = styled.View`
  background-color: #282e3c;
  height: 140px;
  width: 95%;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
`;
