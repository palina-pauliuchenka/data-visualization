import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSharedState } from "../SharedStateProvider";

function ScatterPlot() {
    const { filteredPhones } = useSharedState();
    const chartRef = useRef();

    const brandColors = {
        Apple: "#FF0000", // Red
        Samsung: "#00FF00", // Green
        Oneplus: "#0000FF", // Blue
        Google: "#FFA500", // Orange
        Xiaomi: "#FFFF00", // Yellow
    };

    const drawChart = () => {
        const containerWidth = chartRef.current.offsetWidth;
        const containerHeight = chartRef.current.offsetHeight;
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        // Tooltip
        const tooltip = d3.select("body").selectAll(".tooltip").data([null]).join("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.7)")
            .style("color", "#fff")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("opacity", 0);

        const svg = d3
            .select(chartRef.current)
            .selectAll("svg")
            .data([null])
            .join("svg")
            .attr("width", containerWidth)
            .attr("height", containerHeight);

        if (!filteredPhones || filteredPhones.length === 0) {
            svg.selectAll(".chart-group").remove();
            svg.selectAll(".no-data-text").data([null]).join("text")
                .attr("class", "no-data-text")
                .attr("x", containerWidth / 2)
                .attr("y", containerHeight / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("fill", "#888888")
                .text("No data available to display");
            return;
        } else {
            svg.selectAll(".no-data-text").remove();
        }

        const data = filteredPhones.map((phone, index) => ({
            id: index,
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
            .selectAll(".chart-group")
            .data([null])
            .join("g")
            .attr("class", "chart-group")
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

        // Arrows
        svg.append("defs")
            .append("marker")
            .attr("id", "arrowhead")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("refX", 5)
            .attr("refY", 3)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,0 L6,3 L0,6 Z")
            .attr("fill", "black");

        // Axes arrows and labels
        chartGroup.append("line")
            .attr("x1", 0)
            .attr("x2", width + 20)
            .attr("y1", height)
            .attr("y2", height)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)");

        chartGroup.append("line")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", height)
            .attr("y2", -20)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrowhead)");

        chartGroup.append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Models");

        chartGroup.append("text")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Cost");

        // Points with Tooltip
        chartGroup.selectAll(".point")
            .data(data, (d) => d.id)
            .join("circle")
            .attr("class", "point")
            .attr("cx", (d) => x(d.model) + x.bandwidth() / 2)
            .attr("cy", (d) => y(d.price))
            .attr("r", 6)
            .attr("fill", (d) => brandColors[d.brand] || "#888888")
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`
                        <div>
                            <strong>Brand:</strong> ${d.brand}<br>
                            <strong>Model:</strong> ${d.model}<br>
                            <strong>Price:</strong> $${d.price.toFixed(2)}<br>
                            <strong>Release Year:</strong> ${d.year || "N/A"}<br>
                            <strong>Weight:</strong> ${d.weight || "N/A"}<br>
                            <strong>Display Size:</strong> ${d.size || "N/A"}<br>
                            <strong>Battery:</strong> ${d.battery || "N/A"} mAh
                        </div>
                    `);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });
    };

    useEffect(() => {
        drawChart();
        const handleResize = () => drawChart();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [filteredPhones]);

    return <div className="h-full w-full relative">
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    </div>;
}

export default ScatterPlot;



// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { useSharedState } from "../SharedStateProvider";
//
// function ScatterPlot() {
//     const { filteredPhones } = useSharedState();
//     const chartRef = useRef();
//
//     const brandColors = {
//         Apple: "#FF0000", // Red
//         Samsung: "#00FF00", // Green
//         Oneplus: "#0000FF", // Blue
//         Google: "#FFA500", // Orange
//         Xiaomi: "#FFFF00", // Yellow
//     };
//
//     const drawChart = () => {
//         // Clear previous chart
//         d3.select(chartRef.current).select("svg").remove();
//
//         // Responsive dimensions
//         const containerWidth = chartRef.current.offsetWidth;
//         const containerHeight = chartRef.current.offsetHeight;
//         const margin = { top: 20, right: 20, bottom: 70, left: 80 }; // Adjusted margins for axis titles
//         const width = containerWidth - margin.left - margin.right;
//         const height = containerHeight - margin.top - margin.bottom;
//
//         // Create SVG container
//         const svg = d3
//             .select(chartRef.current)
//             .append("svg")
//             .attr("width", containerWidth)
//             .attr("height", containerHeight);
//
//         if (!filteredPhones || filteredPhones.length === 0) {
//             // Show placeholder text when no data
//             svg.append("text")
//                 .attr("x", containerWidth / 2)
//                 .attr("y", containerHeight / 2)
//                 .attr("text-anchor", "middle")
//                 .style("font-size", "16px")
//                 .style("font-weight", "bold")
//                 .style("fill", "#888888")
//                 .text("No data available to display");
//             return;
//         }
//
//         const data = filteredPhones.map((phone, index) => ({
//             id: index,
//             model: phone.model,
//             price: parseFloat(phone.price),
//             brand: phone.brand.trim().charAt(0).toUpperCase() + phone.brand.trim().slice(1).toLowerCase(),
//         }));
//
//         // Dynamically calculate max price
//         const maxPrice = d3.max(data, (d) => d.price) || 100;
//
//         // Create chart group
//         const chartGroup = svg
//             .append("g")
//             .attr("transform", `translate(${margin.left},${margin.top})`);
//
//         // Scales
//         const x = d3
//             .scaleBand()
//             .domain(data.map((d) => d.model))
//             .range([0, width])
//             .padding(0.2);
//
//         const y = d3
//             .scaleLinear()
//             .domain([0, maxPrice * 1.1])
//             .nice()
//             .range([height, 0]);
//
//         // Axes
//         const xAxis = d3.axisBottom(x).tickSize(0).tickFormat(() => ""); // Removes x-axis labels
//         const yAxis = d3.axisLeft(y).tickSize(0).tickFormat(() => ""); // Removes y-axis labels
//
//         chartGroup
//             .append("g")
//             .attr("transform", `translate(0,${height})`)
//             .call(xAxis);
//
//         chartGroup.append("g").call(yAxis);
//
//         // Add arrow markers
//         svg.append("defs")
//             .append("marker")
//             .attr("id", "arrowhead")
//             .attr("markerWidth", 6)
//             .attr("markerHeight", 6)
//             .attr("refX", 5)
//             .attr("refY", 3)
//             .attr("orient", "auto")
//             .append("path")
//             .attr("d", "M0,0 L6,3 L0,6 Z")
//             .attr("fill", "black");
//
//         // Add x-axis arrow
//         chartGroup
//             .append("line")
//             .attr("x1", 0)
//             .attr("x2", width + 20)
//             .attr("y1", height)
//             .attr("y2", height)
//             .attr("stroke", "black")
//             .attr("stroke-width", 2)
//             .attr("marker-end", "url(#arrowhead)");
//
//         // Add y-axis arrow
//         chartGroup
//             .append("line")
//             .attr("x1", 0)
//             .attr("x2", 0)
//             .attr("y1", height)
//             .attr("y2", -20)
//             .attr("stroke", "black")
//             .attr("stroke-width", 2)
//             .attr("marker-end", "url(#arrowhead)");
//
//         // Add x-axis title: "Models"
//         chartGroup
//             .append("text")
//             .attr("x", width / 2)
//             .attr("y", height + 40) // Adjust below the x-axis
//             .attr("text-anchor", "middle")
//             .style("font-size", "16px")
//             .style("font-weight", "bold")
//             .text("Models");
//
//         // Add y-axis title: "Cost"
//         chartGroup
//             .append("text")
//             .attr("x", -(height / 2))
//             .attr("y", -50) // Adjust left of the y-axis
//             .attr("transform", "rotate(-90)")
//             .attr("text-anchor", "middle")
//             .style("font-size", "16px")
//             .style("font-weight", "bold")
//             .text("Cost");
//
//         // Tooltip
//         const tooltip = d3
//             .select(chartRef.current)
//             .append("div")
//             .attr(
//                 "class",
//                 "absolute bg-gray-800 text-white text-sm px-3 py-2 rounded opacity-0 pointer-events-none z-10"
//             )
//             .style("transition", "opacity 0.2s ease")
//             .style("position", "absolute")
//             .style("font-size", "14px");
//
//         // Points
//         chartGroup
//             .selectAll(".point")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("class", "point")
//             .attr("cx", (d) => x(d.model) + x.bandwidth() / 2)
//             .attr("cy", (d) => y(d.price))
//             .attr("r", 6)
//             .attr("fill", (d) => brandColors[d.brand] || "#888888")
//             .attr("stroke", "#000000")
//             .attr("stroke-width", 2)
//             .on("mouseover", (event, d) => {
//                 tooltip
//                     .style("opacity", 1)
//                     .html(
//                         `<div>
//                             <strong>Brand:</strong> ${d.brand}<br>
//                             <strong>Model:</strong> ${d.model}<br>
//                             <strong>Price:</strong> $${d.price.toFixed(2)}
//                         </div>`
//                     );
//             })
//             .on("mousemove", (event) => {
//                 const chartBoundingBox = chartRef.current.getBoundingClientRect();
//                 tooltip
//                     .style("left", `${event.clientX - chartBoundingBox.left + 10}px`)
//                     .style("top", `${event.clientY - chartBoundingBox.top - 20}px`);
//             })
//             .on("mouseout", () => {
//                 tooltip.style("opacity", 0);
//             });
//     };
//
//     useEffect(() => {
//         drawChart();
//
//         const handleResize = () => {
//             drawChart();
//         };
//
//         window.addEventListener("resize", handleResize);
//
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, [filteredPhones]);
//
//     return (
//         <div className="h-full w-full relative">
//             <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
//         </div>
//     );
// }
//
// export default ScatterPlot;
