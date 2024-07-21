import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import { Autorization, Registration, Users } from "./pages";
import styled from "styled-components";

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Rage = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Rage>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Autorization />} />
					<Route path="/register" element={<Registration />} />
					import {(Autorization, Registration.UsersContainer)} from
					"./pages";
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:post_id" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Rage>
			<Footer />
		</AppColumn>
	);
};
