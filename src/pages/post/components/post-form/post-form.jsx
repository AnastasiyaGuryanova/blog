import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon, Input } from "@components";
import { SpecialPanel } from "../special-panel/special-panel";
import { savePostAsync } from "@actions";
import { sanitizeContent } from "./utils";
import styled from "styled-components";
import { PROP_TYPE } from "@constants";

const PostFormContainer = ({
	post: { id, title, imageUrl, content, publishedAt },
	className,
}) => {
	const [imageFile, setImageFile] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const newContent = contentRef.current
			? contentRef.current.innerHTML
			: "";
		setIsFormValid(
			!!titleValue.trim() && !!newContent.trim() && !!imageFile,
		);
	}, [titleValue, imageFile]);

	useLayoutEffect(() => {
		setImageFile(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		if (!isFormValid) {
			alert(
				"Пожалуйста, заполните все обязательные поля (заголовок, изображение и контент)",
			);
			return;
		}

		const newContent = sanitizeContent(contentRef.current.innerHTML);

		const formData = new FormData();
		formData.append("imageFile", imageFile);
		formData.append("title", titleValue);
		formData.append("content", newContent);

		dispatch(savePostAsync(id, formData)).then(({ id }) =>
			navigate(`/post/${id}`),
		);
	};

	const onImageChange = ({ target }) => {
		const file = target.files[0];
		setImageFile(file);
	};

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	return (
		<div className={className}>
			<Input
				type="file"
				name="imageFile"
				accept="image/*"
				encType="multipart/form-data"
				onChange={onImageChange}
			/>

			<Input
				value={titleValue}
				placeholder="Заголовок..."
				required
				onChange={onTitleChange}
			/>

			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				required
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		font-size: 18px;
		white-space: pre-line;
		border: 1px solid #000;
	}

	& input[type="file"] {
		border: none;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
