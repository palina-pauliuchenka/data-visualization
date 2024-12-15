import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSharedState } from "../SharedStateProvider";

function BarChart() {
    const { filteredPhones } = useSharedState();
    const chartRef = useRef();
    const tooltipRef = useRef();

    const brandColors = {
        Apple: "#FF0000",
        Samsung: "#00FF00",
        Oneplus: "#0000FF",
        Google: "#FFA500",
        Xiaomi: "#FFFF00",
    };

    const drawChart = () => {
        // Clear previous chart
        const svgContainer = d3.select(chartRef.current);
        svgContainer.select("svg").remove();

        const containerWidth = chartRef.current.offsetWidth;
        const containerHeight = chartRef.current.offsetHeight;

        const margin = { top: 20, right: 30, bottom: 100, left: 50 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = svgContainer
            .append("svg")
            .attr("width", containerWidth)
            .attr("height", containerHeight);

        if (!filteredPhones || filteredPhones.length === 0) {
            svg.append("text")
                .attr("x", containerWidth / 2)
                .attr("y", containerHeight / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("fill", "#888888")
                .text("No data available to display");
            return;
        }

        const data = filteredPhones.map((phone) => ({
            model: phone.model,
            price: parseFloat(phone.price),
            brand: phone.brand.trim().charAt(0).toUpperCase() + phone.brand.trim().slice(1).toLowerCase(),
            year: phone.year,
            weight: phone.weight,
            display: phone.size,
            battery: phone.battery,
        }));

        const maxPrice = d3.max(data, (d) => d.price) || 100;

        const chartGroup = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.model))
            .range([0, width])
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, maxPrice * 1.1])
            .nice()
            .range([height, 0]);

        // Add axes
        chartGroup
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        chartGroup.append("g").call(d3.axisLeft(y));

        const tooltip = d3.select(tooltipRef.current);

        // Bind data to bars with animation
        const bars = chartGroup.selectAll(".bar").data(data, (d) => d.model);

        // ENTER: Add new bars
        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.model))
            .attr("y", height) // Start bars at the bottom
            .attr("width", x.bandwidth())
            .attr("height", 0) // Initial height is 0
            .attr("fill", (d) => brandColors[d.brand] || "#888888")
            .on("mouseover", (event, d) => {
                tooltip
                    .style("opacity", 1)
                    .html(
                        `<div>
                            <strong>Brand:</strong> ${d.brand}<br>
                            <strong>Model:</strong> ${d.model}<br>
                            <strong>Price:</strong> $${d.price.toFixed(2)}
                            <strong>Release Year:</strong> ${d.year || "N/A"}<br>
                            <strong>Weight:</strong> ${d.weight || "N/A"}<br>
                            <strong>Display Size:</strong> ${d.size || "N/A"}<br>
                            <strong>Battery:</strong> ${d.battery || "N/A"} mAh
                        </div>`
                    );
            })
            .on("mousemove", (event) => {
                const chartBoundingBox = chartRef.current.getBoundingClientRect();
                tooltip
                    .style("left", `${event.clientX - chartBoundingBox.left + 10}px`)
                    .style("top", `${event.clientY - chartBoundingBox.top - 20}px`);
            })
            .on("mouseout", () => tooltip.style("opacity", 0))
            // Animate the bar growing up
            .transition()
            .duration(750)
            .attr("y", (d) => y(d.price))
            .attr("height", (d) => height - y(d.price));

        // UPDATE: Animate existing bars
        bars.transition()
            .duration(750)
            .attr("y", (d) => y(d.price))
            .attr("height", (d) => height - y(d.price));

        // EXIT: Animate bars out
        bars.exit()
            .transition()
            .duration(750)
            .attr("y", height)
            .attr("height", 0)
            .remove();
    };

    useEffect(() => {
        drawChart();

        const handleResize = () => {
            drawChart();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [filteredPhones]);

    return (
        <div className="h-full w-full relative">
            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className="absolute bg-gray-800 text-white text-sm px-3 py-2 rounded opacity-0 pointer-events-none z-10"
                style={{
                    transition: "opacity 0.2s ease",
                    whiteSpace: "normal",
                    maxWidth: "200px",
                    wordWrap: "break-word",
                }}
            ></div>
            <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
}

export default BarChart;
