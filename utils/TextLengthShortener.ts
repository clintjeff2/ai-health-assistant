import React from 'react';

type Props = {};

function TextLengthShortener(maxLength: number, text: string): string {
	const finalText = text.substring(0, maxLength);
	return `${finalText}...`;
}

export default TextLengthShortener;
