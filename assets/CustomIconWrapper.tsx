import React from "react";

type IconProps = {
    size?: number | string
    color?: string
    strokeWidth?: number
} & React.SVGProps<SVGSVGElement>;

export function createCustomIcon(
    name: string,
    children: React.ReactNode
) {
    const Icon = React.forwardRef<SVGSVGElement, IconProps>(
        ({
            size = 24,
            color = "currentColor",
            strokeWidth = 2,
            viewBox = "0 0 24 24",
            fill = "none",
            ...rest
        }, ref) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox={viewBox}
                fill={fill}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label={name}
                role="img"
                {...rest}
                >
                {children}
            </svg>
        )
    );

    Icon.displayName = `${name}Icon`;
    return Icon;
}