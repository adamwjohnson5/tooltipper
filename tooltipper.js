/*

Tooltipper v1.1
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
    constructor(bgColor = '#FFF', txtColor = '#000', bdrRadius = '0px') {
        this.bgColor = bgColor;
        this.txtColor = txtColor;
        this.bdrRadius = bdrRadius;
        this.tooltipper = document.createElement('div');
    }
    
    init() {
        if (! navigator.userAgent.match(/iPhone|iPad|iPod/i) && ! navigator.userAgent.match(/Android/i)) { // DT only
            // Style container and add to DOM
            this.tooltipper.style.position = 'fixed';
            this.tooltipper.style.zIndex = 999;
            this.tooltipper.style.display = 'none';
            this.tooltipper.style.margin = '8px';
            this.tooltipper.style.padding = '4px';
            this.tooltipper.style.paddingLeft = '6px';
            this.tooltipper.style.paddingRight = '6px';
            this.tooltipper.style.fontSize = '12px';
            this.tooltipper.style.fontFamily = 'sans-serif';
            this.tooltipper.style.backgroundColor = this.bgColor;
            this.tooltipper.style.color = this.txtColor;
            this.tooltipper.style.borderRadius = this.bdrRadius;
            document.querySelector('body').after(this.tooltipper);
            
            // Mouse move
            window.addEventListener('mousemove', (e) => {
                const windowWidth = window.innerWidth;
                let i = (windowWidth / 2);
                if (e.pageX > i) { // Right side of window
                    this.tooltipper.style.left = 'auto';
                    this.tooltipper.style.right = (windowWidth - e.pageX) + 'px';
                    this.tooltipper.style.boxShadow = '-1px 1px 3px rgba(0, 0, 0, 0.25)';
                } else { // Left side of window
                    this.tooltipper.style.right = 'auto';
                    this.tooltipper.style.left = e.pageX + 'px';
                    this.tooltipper.style.boxShadow = '1px 1px 3px rgba(0, 0, 0, 0.25)';
                }
                this.tooltipper.style.top = e.pageY + 'px';
            });
            
            // Loop all items in DOM with a tooltipper attr
            const tooltips = document.querySelectorAll('a[data-tooltipper]');
            for (let x = 0; x < tooltips.length; x++) {
                this.add(tooltips[x]);
            }
        }
    }
    
    add(item) {
        item.addEventListener('mouseover', () => {
            let i = item.getAttribute('data-tooltipper');
            this.tooltipper.textContent = i;
            this.tooltipper.style.display = 'inline';
        });
        item.addEventListener('mouseout', () => {
            this.tooltipper.style.display = 'none';
        });
    }
}