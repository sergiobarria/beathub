export function AppFooter() {
	return (
		<footer className="mt-6 flex flex-col items-center gap-2 border-t border-gray-600 py-8 text-xs text-gray-400">
			<p>Copyright &copy; DJ Block {new Date().getFullYear()}</p>
			<p>Powered by Next.js, Turso and Tailwind CSS</p>
		</footer>
	);
}
