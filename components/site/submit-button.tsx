import { useFormStatus } from 'react-dom';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SubmitButton() {
	const status = useFormStatus();

	return (
		<Button className="mt-6 px-10" disabled={status.pending} aria-disabled={status.pending}>
			{status.pending ? <Loader2Icon className="size-4 animate-spin" /> : 'Save Event'}
		</Button>
	);
}
