var format = require('util').format;
var $ = require('cheerio');
var getAttrs = require('./util/getAttrs');

/**
 * Returns output for desired custom element
 * @param {object} element - Element as a Cheerio object.
 * @returns {string} HTML converted from a custom element to table syntax.
 */
module.exports = function (element) {
	var inner = element.html();
	var attrs = getAttrs(element);

	switch (element[0].name) {
		// <hr>
		case this.components.hLine:
			var classes = ['h-line'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table class="%s"><tr><th>&nbsp;</th></tr></table>', classes.join(' '))

		//
		//

		// <column>
		case this.components.columns:
			return this.makeColumn(element, 'columns');

		//
		//

		// <row>
		case this.components.row:
			var classes = ['row'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s class="%s"><tbody><tr>%s</tr></tbody></table>', attrs, classes.join(' '), inner);

		//
		//

		// <button>
		case this.components.button:
			var expander = '';

			// Prepare optional target attribute for the <a> element
			var target = '';
			if (element.attr('target')) {
				target = ' target=' + element.attr('target');
			}

			// If we have the href attribute we can create an anchor for the inner of the button;
			if (element.attr('href')) {
				inner = format('<a %s href="%s"%s>%s</a>', attrs, element.attr('href'), target, inner);
			}

			// If the button is expanded, it needs a <center> tag around the content
			if (element.hasClass('expand') || element.hasClass('expanded')) {
				inner = format('<center>%s</center>', inner);
				expander = '\n<td class="expander"></td>';
			}

			// The .button class is always there, along with any others on the <button> element
			var classes = ['button'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table class="%s"><tbody><tr><td><table><tbody><tr><td>%s</td></tr></tbody></table></td>%s</tr></tbody></table>', classes.join(' '), inner, expander);

		//
		//

		// <container>
		case this.components.container:
			var classes = ['container'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s align="center" class="%s"><tbody><tr><td>%s</td></tr></tbody></table>', attrs, classes.join(' '), inner);

		//
		//

		// <inky>
		case this.components.inky:
			return '<tr><td><img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/octopus.png" /></tr></td>';

		//
		//

		// <block-grid>
		case this.components.blockGrid:
			var classes = ['block-grid', 'up-' + element.attr('up')];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table class="%s"><tbody><tr>%s</tr></tbody></table>', classes.join(' '), inner);

		//
		//

		// <menu>
		case this.components.menu:
			var classes = ['menu'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s class="%s"><tbody><tr><td><table><tbody><tr>%s</tr></tbody></table></td></tr></tbody></table>', attrs, classes.join(' '), inner);

		//
		//

		// <item>
		case this.components.menuItem:
			// Prepare optional target attribute for the <a> element
			var target = '';
			if (element.attr('target')) {
				target = ' target=' + element.attr('target');
			}
			var classes = ['menu-item'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<th %s class="%s"><a href="%s"%s>%s</a></th>', attrs, classes.join(' '), element.attr('href'), target, inner);

		//
		//

		// <accordion>
		case this.components.accordion:
			var classes = ['accordion'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s class="%s"><tr><td class="accordion-inner"><table>%s</table></td></tr></table>', attrs, classes.join(' '), inner);

		//
		//

		// <accordion-item>
		case this.components.accordionItem:
			var classes = ['accordion-element'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<tr><td>\n<label class="%s">\n<!--[if !mso | IE]><!-->\n<input type="checkbox" class="accordion-checkbox" style="display: none;">\n<!--<![endif]-->\n<div>%s</div></label>\n</td></tr>', classes.join(' '), inner);

		//
		//

		// <accordion-item-header>
		case this.components.accordionHeader:
			var classes = ['accordion-title'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}
			var iconMoreURL = '';
			if (element.attr('iconmoresrc')) {
				iconMoreURL = element.attr('iconmoresrc');
			}
			var iconMoreAltText = '+';
			if (element.attr('iconmorealt')) {
				iconMoreAltText = element.attr('iconmorealt');
			}
			var iconLessURL = '';
			if (element.attr('iconlesssrc')) {
				iconLessURL = element.attr('iconlesssrc');
			}
			var iconLessAltText = '-';
			if (element.attr('iconlessalt')) {
				iconLessAltText = element.attr('iconlessalt');
			}

			return format('<div class="%s"><table><tr><td class="accordion-header" valign="middle">%s</td><!--[if !mso | IE]><!--><td class="accordion-ico" valign="middle">\n<img class="accordion-more" src="%s" alt="%s">\n<img class="accordion-less" src="%s" alt="%s">\n</td><!--<![endif]--></tr></table></div>', classes.join(' '), inner, iconMoreURL, iconMoreAltText, iconLessURL, iconLessAltText);

		//
		//

		// <accordion-item-header>
		case this.components.accordionContent:
			var classes = ['accordion-content'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<div class="%s"><table><tr><td>%s</td></tr></table></div>', classes.join(' '), inner);

		//
		//

		// <center>
		case this.components.center:
			if (element.children().length > 0) {
				element.children().each(function () {
					$(this).attr('align', 'center');
					$(this).addClass('float-center');
				});
				element.find('item, .menu-item').addClass('float-center');
			}

			element.attr('data-parsed', '');

			return format('%s', $.html(element, this.cheerioOpts));

		//
		//

		// <callout>
		case this.components.callout:
			var classes = ['callout-inner'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s class="callout"><tbody><tr><th class="%s">%s</th><th class="expander"></th></tr></tbody></table>', attrs, classes.join(' '), inner);

		//
		//

		// <spacer>
		case this.components.spacer:
			var classes = ['spacer'];
			var size;
			var html = '';
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}
			if (element.attr('size-sm') || element.attr('size-lg')) {
				if (element.attr('size-sm')) {
					size = (element.attr('size-sm'));
					html += format('<table %s class="%s hide-for-large"><tbody><tr><td height="' + size + '" style="font-size:' + size + 'px;line-height:' + size + 'px;">&nbsp;</td></tr></tbody></table>', attrs);
				}
				if (element.attr('size-lg')) {
					size = (element.attr('size-lg'));
					html += format('<table %s class="%s show-for-large"><tbody><tr><td height="' + size + '" style="font-size:' + size + 'px;line-height:' + size + 'px;">&nbsp;</td></tr></tbody></table>', attrs);
				}
			} else {
				size = (element.attr('size')) || 16;
				html += format('<table %s class="%s"><tbody><tr><td height="' + size + '" style="font-size:' + size + 'px;line-height:' + size + 'px;">&nbsp;</td></tr></tbody></table>', attrs);
			}

			if (element.attr('size-sm') && element.attr('size-lg')) {
				return format(html, classes.join(' '), classes.join(' '), inner);
			}

			return format(html, classes.join(' '), inner);

		//
		//

		// <wrapper>
		case this.components.wrapper:
			var classes = ['wrapper'];
			if (element.attr('class')) {
				classes = classes.concat(element.attr('class').split(' '));
			}

			return format('<table %s class="%s" align="center"><tbody><tr><td class="wrapper-inner">%s</td></tr></tbody></table>', attrs, classes.join(' '), inner);

		//
		//

		// If it's not a custom component, return it as-is
		default:
			return format('<tr><td>%s</td></tr>', $.html(element, this.cheerioOpts));
	}
}