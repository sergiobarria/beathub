'use client';

import { useFormState } from 'react-dom';
import {
	useForm,
	getFormProps,
	getInputProps,
	getSelectProps,
	getTextareaProps
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FieldErrors } from '@/components/site/field-errors';
import { DatePicker } from '@/components/site/date-picker';
import { SubmitButton } from '@/components/site/submit-button';
import { createEventRecord } from '@/actions/events';
import { InsertEventSchema, State } from '@/lib/schemas';

interface EventFormProps {
	states: Omit<State, 'abbreviation'>[];
}

export function EventForm({ states }: EventFormProps) {
	const [lastResult, createEventAction] = useFormState(createEventRecord, undefined);

	const [form, fields] = useForm({
		id: 'create-event',
		lastResult,
		onValidate: ({ formData }) => {
			return parseWithZod(formData, { schema: InsertEventSchema });
		},
		shouldValidate: 'onBlur',
		defaultValue: {
			name: '',
			venue: '',
			date: new Date(),
			time: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			description: ''
		}
	});

	return (
		<form
			{...getFormProps(form)}
			action={createEventAction}
			className="flex flex-col gap-8 lg:flex-row"
		>
			<div className="space-y-3 lg:w-3/5">
				<div>
					<Label htmlFor="name">*Event Name</Label>
					<Input
						{...getInputProps(fields.name, { type: 'text' })}
						placeholder="e.g. DJ Block Party"
					/>
					<FieldErrors errors={fields.name.errors} />
				</div>

				<div>
					<Label htmlFor="venue">*Event Venue</Label>
					<Input
						{...getInputProps(fields.venue, { type: 'text' })}
						placeholder="Club XYZ"
					/>
					<FieldErrors errors={fields.venue.errors} />
				</div>

				<div className="flex flex-col gap-3 lg:flex-row">
					<div className="w-full">
						<Label htmlFor="date">*Date</Label>
						<DatePicker meta={fields.date} />
						<FieldErrors errors={fields.date.errors} />
					</div>

					<div className="w-full">
						<Label htmlFor="name">*Event Time</Label>
						<Input {...getInputProps(fields.time, { type: 'time' })} />
						<FieldErrors errors={fields.time.errors} />
					</div>
				</div>

				<hr className="border-t border-gray-400" />
				<p className="text-lg font-bold">Event Detailed Location</p>

				<div>
					<Label htmlFor="street">*Event Address</Label>
					<Input
						{...getInputProps(fields.street, { type: 'text' })}
						placeholder="1234 Main St."
					/>
					<FieldErrors errors={fields.street.errors} />
				</div>

				<div className="flex flex-col gap-3 lg:flex-row">
					<div className="w-full">
						<Label htmlFor="state">*State</Label>
						<Select {...getSelectProps(fields.state)} defaultValue={fields.state.value}>
							<SelectTrigger>
								<SelectValue placeholder="State" />
							</SelectTrigger>

							<SelectContent>
								{states.map((state) => (
									<SelectItem key={state.id} value={state.name}>
										{state.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldErrors errors={fields.name.errors} />
					</div>

					<div className="w-full">
						<Label htmlFor="city">*City</Label>
						<Input
							{...getInputProps(fields.city, { type: 'text' })}
							placeholder="Miami"
						/>
						<FieldErrors errors={fields.city.errors} />
					</div>

					<div className="w-full">
						<Label htmlFor="zip">*Zip Code</Label>
						<Input
							{...getInputProps(fields.zip, { type: 'text' })}
							placeholder="12345"
						/>
						<FieldErrors errors={fields.city.errors} />
					</div>
				</div>

				<div className="w-full">
					<Label htmlFor="description">*Event Description</Label>
					<Textarea
						{...getTextareaProps(fields.description)}
						placeholder="This is a cool event that you should attend..."
						rows={5}
					/>
					<FieldErrors errors={fields.street.errors} />
				</div>

				{form.errors && (
					<div>
						{form.errors.map((error) => (
							<small key={error} className="italic text-destructive">
								- {error}
							</small>
						))}
					</div>
				)}

				<SubmitButton />
			</div>
			<div className="lg:w-2/5">image</div>
		</form>
	);
}
