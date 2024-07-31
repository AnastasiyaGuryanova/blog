import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(
	({ className, width, padding, ...props }, ref) => {
		return <input className={className} {...props} ref={ref} />;
	},
);

export const Input = styled(InputContainer)`
	width: ${({ width = "100%" }) => width};
	height: 40px;
	margin: 0 0 10px 0;
	padding: ${({ padding = "10px" }) => padding};
	font-size: 18px;
	border: 1px solid #000;
`;
