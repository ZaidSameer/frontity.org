import React from "react";
import { styled, css, connect } from "frontity";
import { Connect } from "frontity/types";
import FrontityOrg from "../../types";
import Arrow from "./icons/arrow";
import { addAlpha } from "../utils";

const Dropdown: React.FC<Connect<
  FrontityOrg,
  {
    className?: string;
    css?: ReturnType<typeof css>;
  }
>> = ({ className, css, children, state }) => {
  // Define the inner state.
  const [isOpen, setOpen] = React.useState(false);

  // Get rendered `button` and `content` from `children`.
  const [button, content] = React.Children.toArray(children);

  // Get colors from the state.
  const buttonColor = state.theme.colors.frontity;
  const separatorColor = addAlpha(state.theme.colors.primary, 0.08);

  return (
    /**
     * Pass down `className` and `css` props to keep styles
     * added by processors and classes.
     */
    <Container className={className} css={css}>
      <Button onClick={() => setOpen(!isOpen)}>
        {button}
        <IconContainer isOpen={isOpen}>
          <Arrow color={buttonColor} />
        </IconContainer>
      </Button>
      {isOpen && <Content separatorColor={separatorColor}>{content}</Content>}
    </Container>
  );
};

export default connect(Dropdown);

const Container = styled.div`
  cursor: pointer;

  /* Use a more specific selector to change margin and padding */
  &.wp-block-group.has-background {
    padding: 0;
  }
`;

const Button = styled.div`
  min-height: 48px;
  box-sizing: border-box;
  padding: 12px 24px 12px 20px;

  /* Place inner elements in a row */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* Style the inner heading */
  h4 {
    line-height: 24px;
    font-size: 16px;
  }
`;

const IconContainer = styled.div<{ isOpen: boolean }>`
  /* Do not resize icon (it's inside a flex container) */
  flex: 0 0 auto;
  width: auto;
  height: 24px;
  margin-left: 16px;

  /* Center the icon */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Rotate the icon if the dropdown is open */
  transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
  transition: transform 0.3s;
`;

const Content = styled.div<{ separatorColor: string }>`
  padding: 12px 0 16px 0;
  margin: 0 20px;

  /* Draw a separator line */
  border-top: 2px solid ${({ separatorColor }) => separatorColor};

  /* Style inner paragraphs */
  p {
    line-height: 20px;
    font-size: 14px;
  }
`;
