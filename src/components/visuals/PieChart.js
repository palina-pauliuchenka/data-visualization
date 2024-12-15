import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSharedState } from "../SharedStateProvider";

function PieChart() {
    const { filteredPhones, yearFilter, checkedBrands, allSelected } = useSharedState();
    const chartRef = useRef();

    const brandColors = {
        Apple: "#FF0000",
        Samsung: "#00FF00",
        Oneplus: "#0000FF",
        Google: "#FFA500",
        Xiaomi: "#FFFF00",
    };

    const drawChart = () => {
        // Clear previous chart
        d3.select(chartRef.current).select("svg").remove();

        // Responsive dimensions
        const containerWidth = chartRef.current.offsetWidth;
        const containerHeight = chartRef.current.offsetHeight;
        const size = Math.min(containerWidth, containerHeight);
        const radius = size / 2 - 70;

        // Determine which brands to include
        const selectedBrands = allSelected
            ? Array.from(new Set(filteredPhones.map((phone) => phone.brand.trim())))
            : Object.keys(checkedBrands).filter((brand) => checkedBrands[brand]);

        // Filter data based on selected brands and year range
        const filteredData = filteredPhones.filter(
            (phone) =>
                selectedBrands.includes(phone.brand.trim()) &&
                phone.year >= yearFilter[0] &&
                phone.year <= yearFilter[1]
        );

        // Group data by brand and count models
        const brandCounts = filteredData.reduce((acc, phone) => {
            const brand = phone.brand.trim().charAt(0).toUpperCase() + phone.brand.trim().slice(1).toLowerCase();
            acc[brand] = (acc[brand] || 0) + 1;
            return acc;
        }, {});

        const data = Object.entries(brandCounts).map(([brand, count]) => ({
            brand,
            count,
        }));

        console.log("Processed Brands with Counts:", data);

        const svg = d3
            .select(chartRef.current)
            .append("svg")
            .attr("viewBox", `0 0 ${size} ${size}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", `translate(${size / 2},${size / 2})`);

        if (data.length === 0) {
            svg.append("text")
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .style("fill", "#888888")
                .text("No data available to display");
            return;
        }

        const pie = d3.pie().value((d) => d.count).sort(null);

        const arc = d3.arc().innerRadius(radius / 2).outerRadius(radius);

        // Bind data to paths
        const paths = svg.selectAll("path").data(pie(data));

        // Handle entering paths
        paths
            .enter()
            .append("path")
            .attr("fill", (d) => brandColors[d.data.brand] || "#888888")
            .attr("stroke", "#ffffff")
            .style("stroke-width", "2px")
            .each(function (d) {
                this._current = d; // Store the initial angles for animation
            })
            .transition()
            .duration(750)
            .attrTween("d", function (d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(1); // Update _current to the new angle
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        // Handle updating paths
        paths
            .transition()
            .duration(750)
            .attrTween("d", function (d) {
                const interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(1);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        // Handle exiting paths
        paths
            .exit()
            .transition()
            .duration(750)
            .attrTween("d", function (d) {
                const interpolate = d3.interpolate(this._current, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            })
            .remove();

        // Tooltip and labels
        const tooltipGroup = svg.append("g").attr("class", "tooltip-group");

        tooltipGroup
            .selectAll(".tooltip-box")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "tooltip-box")
            .each(function (d) {
                const [x, y] = arc.centroid(d);
                const distance = 1.5;
                const boxX = x * distance;
                const boxY = y * distance;

                const boxAlignX = boxX < 0 ? boxX - 10 : boxX + 10;
                const boxAlignY = boxY;

                d3.select(this)
                    .append("line")
                    .attr("x1", x)
                    .attr("y1", y)
                    .attr("x2", boxAlignX)
                    .attr("y2", boxAlignY)
                    .attr("stroke", brandColors[d.data.brand] || "#888888")
                    .attr("stroke-width", 1);

                d3.select(this)
                    .append("rect")
                    .attr("x", boxAlignX - 50)
                    .attr("y", boxAlignY - 20)
                    .attr("width", 120)
                    .attr("height", 40)
                    .attr("rx", 5)
                    .attr("fill", "#f8f8f8")
                    .attr("stroke", brandColors[d.data.brand] || "#888888")
                    .attr("stroke-width", 1);

                d3.select(this)
                    .append("text")
                    .attr("x", boxAlignX)
                    .attr("y", boxAlignY - 4)
                    .attr("text-anchor", "middle")
                    .style("font-size", "14px")
                    .style("font-weight", "bold")
                    .text(`${d.data.brand}`);

                d3.select(this)
                    .append("text")
                    .attr("x", boxAlignX)
                    .attr("y", boxAlignY + 12)
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .text(`Models: ${d.data.count}`);
            });
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
    }, [filteredPhones, yearFilter, checkedBrands, allSelected]);

    return (
        <div ref={chartRef} className="h-full w-full flex items-center justify-center">
            {/* Chart will render here */}
        </div>
    );
}

export default PieChart;
