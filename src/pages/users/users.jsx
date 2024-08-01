import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useServerRequest } from "../../hooks";
import { H2, PrivateContent } from "../../components";
import { TableRow, UserRow } from "./components";
import { ROLE } from "../../constants";
import { checkAccess } from "../../utils";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		Promise.all([
			requestServer("fetchUsers"),
			requestServer("fetchRoles"),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		requestServer("removeUser", userId).then(() => {
			setUsers((users) => users.filter((user) => user.id !== userId));
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">
							Дата регистрации
						</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users.map(({ id, login, registedAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registedAt={registedAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
