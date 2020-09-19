/*

Tooltipper v1.4
Simple tooltips on hover. Compatible with modern browsers only (ES6+).

https://github.com/adamwjohnson5/tooltipper

By Adam Johnson
MIT License 2020

Usage:

let ttipr = new Tooltipper(bgColor, txtColor, bdrRadius);
ttipr.init(); // Initialize all elements with 'data-tooltipper' attribute

ttipr.add(elem); // Add element after initialize

*/

"use strict";

class Tooltipper {
    constructor(bgColor = '#FFF', txtColor = '#000', bdrRadius = '0px') { // Defaults
        this.bgColor = bgColor;
        this.txtColor = txtColor;
        this.bdrRadius = bdrRadius;
        this.tooltip = document.createElement('div');
    }
    
    init() {
        // Style then add to DOM
        this.tooltip.style.position = 'fixed';
        this.tooltip.style.zIndex = 999; // Always on top
        this.tooltip.style.display = 'none';
        this.tooltip.style.margin = '8px';
        this.tooltip.style.padding = '4px';
        this.tooltip.style.paddingLeft = '6px';
        this.tooltip.style.paddingRight = '6px';
        this.tooltip.style.fontSize = '12px';
        this.tooltip.style.fontFamily = 'sans-serif';
        this.tooltip.style.backgroundColor = this.bgColor;
        this.tooltip.style.color = this.txtColor;
        this.tooltip.style.borderRadius = this.bdrRadius;
        document.querySelector('body').after(this.tooltip);
        
        // Check for touch device
        window.addEventListener('touchstart', () => {
            this.touch = true;
        });

        // Mouse move
        window.addEventListener('mousemove', (e) => {
            const windowWidth = window.innerWidth;
            
            if (e.pageX > (windowWidth / 2)) { // Right side of window
                this.tooltip.style.left = 'auto';
                this.tooltip.style.right = (windowWidth - e.pageX) + 'px';
                this.tooltip.style.boxShadow = '-1px 1px 3px rgba(0, 0, 0, 0.25)';
            } else { // Left side of window
                this.tooltip.style.right = 'auto';
                this.tooltip.style.left = e.pageX + 'px';
                this.tooltip.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.25)';
            }
            
            this.tooltip.style.top = (e.pageY - window.pageYOffset) + 'px';
        });

        // Loop all elems in DOM with a tooltipper attr
        const tooltips = document.querySelectorAll('[data-tooltipper]');
        
        for (let x = 0; x < tooltips.length; x++) {
            this.add(tooltips[x]);
        }
    }
    
    add(elem) {
        elem.addEventListener('mouseover', () => {
            if (!this.touch) { // Not touch device
                this.tooltip.textContent = elem.getAttribute('data-tooltipper');
                this.tooltip.style.display = 'inline';
            }
        });

        elem.addEventListener('mouseout', () => {
            this.tooltip.style.display = 'none';
        });
    }
}