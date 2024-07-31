import styled from "styled-components";
import { Icon, Input } from "../../../../components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск статьи ...."
				padding="10px 34px 10px 10px"
				onChange={onChange}
			/>
			<Icon id="fa-search" inactive="true" size="22px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 360px;
	height: 40px;
	margin: 40px auto 0;

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
	}
`;
