import React, { useState } from "react";

import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import { WidgetRepository } from "../../domain/WidgetRepository";
import styles from "./AddWidgetForm.module.scss";

type AddWidgetSubmitFormEvent = React.FormEvent<HTMLFormElement> & {
	target: { id: { value: string }; repositoryUrl: { value: string } };
};

export function AddWidgetForm({ repository }: { repository: WidgetRepository }) {
	const [isFormActive, setIsFormActive] = useState(false);

	const submitForm = async (ev: AddWidgetSubmitFormEvent) => {
		ev.preventDefault();
		const { id, repositoryUrl } = ev.target;
		await repository.save({ id: id.value, repositoryUrl: repositoryUrl.value });
		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" name="id" id="id" />
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input type="text" name="repositoryUrl" id="repositoryUrl" />
						</div>

						<div>
							<button>Añadir</button>
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
