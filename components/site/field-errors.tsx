type FieldErrorsProps = {
	errors: string[] | undefined;
};

export function FieldErrors({ errors }: FieldErrorsProps) {
	if (!errors) return null;

	return (
		<div>
			{errors.map((error, index) => (
				<small key={index} className="italic text-red-500">
					*{error}
				</small>
			))}
		</div>
	);
}
