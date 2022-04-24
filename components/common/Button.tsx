import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

//버튼 색상 구히기 후에 색상이 추가된다면 다른 색을 추가해서 컨트롤해도됨
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case 'dark_cyan':
        return css`
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
        color: white;
      `;
    case 'bittersweet':
      return css`
        background-color: ${palette.bittersweet};
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

// const normalButtonStyle = css`
//   width: 100%;
//   height: 48px;
//   padding: 0 15px;
//   border: 0;
//   border-radius: 4px;
//   background-color: ${palette.bittersweet};
//   color: white;
//   font-size: 16px;
//   font-weight: 800;
//   outline: none;
//   cursor: pointer;
// `;
// const RegisterButtonStyle = css`
//   width: 161px;
//   height: 45px;
//   border: 1px solid ${palette.gray_c4};
//   background-color: black;
//   border-radius: 4px;
//   color: ${palette.gray_48};
//   font-size: 18px;
//   font-weight: 700;
//   outline: none;
//   cursor: pointer;
// `;

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
}
const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${props => props.width};
  ${props => getButtonColor(props.color || '', props.colorReverse)};
  svg {
    margin-right: 12px;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'dark_cyan' | 'bittersweet' | 'white';
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<IProps> = ({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  ...props
}) => {
  console.log('colorReverse');
  console.log(colorReverse);
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
