import { Route, Routes } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer, Modal } from "./components";
import { Autorization, Registration, Post, Users } from "./pages";
import { setUser } from "./actions";
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
	padding: 120px 0 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

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
					<Route path="/posts" element={<div>Новая статья</div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Rage>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
