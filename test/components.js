var compare = require('./lib/compare');

describe('Center', () => {
  it('applies a text-center class and center alignment attribute to the first child', () => {
    var input = `
      <center>
        <div></div>
      </center>
    `;
    var expected = `
      <center>
        <div align="center" class="float-center"></div>
      </center>
    `;

    compare(input, expected);
  });

  it(`doesn't choke if center tags are nested`, () => {
    var input = `
      <center>
        <center>
        </center>
      </center>
    `;

    var expected = `
      <center>
        <center align="center" class="float-center">
        </center>
      </center>
    `;

    compare(input, expected);
  });

  it('applies the class float-center to <item> elements', () => {
    var input = `
      <center>
        <menu>
          <item href="#"></item>
        </menu>
      </center>
    `;

    var expected = `
      <center>
        <table align="center" class="menu float-center">
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th class="menu-item float-center"><a href="#"></a></th>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    `;

    compare(input, expected);
  });
});

describe('Button', () => {
  it('creates a simple button', () => {
    var input = '<button href="http://zurb.com">Button</button>';
    var expected = `
      <table class="button">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td><a href="http://zurb.com">Button</a></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a button with target="_blank" attribute', () => {
    var input = '<button href="http://zurb.com" target="_blank">Button</button>';
    var expected = `
      <table class="button">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td><a href="http://zurb.com" target="_blank">Button</a></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a button with classes', () => {
    var input = `
      <button class="small alert" href="http://zurb.com">Button</button>
    `;
    var expected = `
      <table class="button small alert">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td><a href="http://zurb.com">Button</a></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a correct expanded button', () => {
    var input = `
      <button class="expand" href="http://zurb.com">Button</button>
    `;
    var expected = `
      <table class="button expand">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <center><a href="http://zurb.com" align="center" class="float-center">Button</a></center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="expander"></td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('Menu', () => {
  it('creates a menu with item tags inside', () => {
    var input = `
      <menu>
        <item href="http://zurb.com">Item</item>
      </menu>
    `;
    var expected = `
      <table class="menu">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <th class="menu-item"><a href="http://zurb.com">Item</a></th>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a menu with items tags inside, containing target="_blank" attribute', () => {
    var input = `
      <menu>
        <item href="http://zurb.com" target="_blank">Item</item>
      </menu>
    `;
    var expected = `
      <table class="menu">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <th class="menu-item"><a href="http://zurb.com" target="_blank">Item</a></th>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a menu with classes', () => {
    var input = `
      <menu class="vertical">
      </menu>
    `;
    var expected = `
      <table class="menu vertical">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('works without using an item tag', () => {
    var input = `
      <menu>
        <th class="menu-item"><a href="http://zurb.com">Item 1</a></th>
      </menu>
    `;
    var expected = `
      <table class="menu">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <th class="menu-item"><a href="http://zurb.com">Item 1</a></th>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('Callout', () => {
  it('creates a callout with correct syntax', () => {
    var input = '<callout>Callout</callout>';
    var expected = `
      <table class="callout">
        <tbody>
          <tr>
            <th class="callout-inner">Callout</th>
            <th class="expander"></th>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('copies classes to the final HTML', () => {
    var input = '<callout class="primary">Callout</callout>';
    var expected = `
      <table class="callout">
        <tbody>
          <tr>
            <th class="callout-inner primary">Callout</th>
            <th class="expander"></th>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('Spacer', () => {
  it('creates a spacer element with correct size', () => {
    var input = '<spacer size="10"></spacer>';
    var expected = `
      <table class="spacer">
        <tbody>
          <tr>
            <td height="10" style="font-size:10px;line-height:10px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });


  it('creates a spacer with a default size or no size defined', () => {
    var input = '<spacer></spacer>';
    var expected = `
      <table class="spacer">
        <tbody>
          <tr>
            <td height="16" style="font-size:16px;line-height:16px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a spacer element for small screens with correct size', () => {
    var input = '<spacer size-sm="10"></spacer>';
    var expected = `
      <table class="spacer hide-for-large">
        <tbody>
          <tr>
            <td height="10" style="font-size:10px;line-height:10px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a spacer element for large screens with correct size', () => {
    var input = '<spacer size-lg="20"></spacer>';
    var expected = `
      <table class="spacer show-for-large">
        <tbody>
          <tr>
            <td height="20" style="font-size:20px;line-height:20px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a spacer element for small and large screens with correct sizes', () => {
    var input = '<spacer size-sm="10" size-lg="20"></spacer>';
    var expected = `
      <table class="spacer hide-for-large">
        <tbody>
          <tr>
            <td height="10" style="font-size:10px;line-height:10px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
      <table class="spacer show-for-large">
        <tbody>
          <tr>
            <td height="20" style="font-size:20px;line-height:20px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('copies classes to the final spacer HTML', () => {
    var input = '<spacer size="10" class="bgcolor"></spacer>';
    var expected = `
      <table class="spacer bgcolor">
        <tbody>
          <tr>
            <td height="10" style="font-size:10px;line-height:10px;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('wrapper', () => {
  it('creates a wrapper that you can attach classes to', () => {
    var input = `<wrapper class="header"></wrapper>`;
    var expected = `
      <table class="wrapper header" align="center">
        <tbody>
          <tr>
            <td class="wrapper-inner"></td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('h-line', () => {
  it('creates a horizontal rule that you can attach classes to', () => {
    var input = `<h-line class="dotted">`;
    var expected = `
      <table class="h-line dotted">
        <tr>
          <th>&nbsp;</th>
        </tr>
      </table>
    `;
    compare(input, expected);
  });
});

describe('Accordion', () => {
	it('creates a accordion container', () => {
		var input = `
			<accordion></accordion>
		`;
		var expected = `
			<table class="accordion">
				<tr>
					<td class="accordion-inner">
						<table></table>
					</td>
				</tr>
			</table>
		`;

    compare(input, expected);
	});

	it('creates a accordion and accordion-item containers', () => {
		var input = `
			<accordion>
				<accordion-item></accordion-item>
			</accordion>
		`;
		var expected = `
			<table class="accordion">
				<tr>
					<td class="accordion-inner">
						<table>
							<tr>
								<td>
									<label class="accordion-element">
										<!--[if !mso | IE]><!-->
										<input type="checkbox" class="accordion-checkbox" style="display: none;">
										<!--<![endif]-->
										<div></div>
									</label>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;

		compare(input, expected);
	})

	it('creates a accordion with a single item', () => {
		var input = `
			<accordion>
				<accordion-item>
					<accordion-item-header iconMoreSrc="{{image-path}}icons/arrow-more.png" iconLessSrc="{{image-path}}icons/arrow-less.png">Accordion #1</accordion-item-header>
					<accordion-item-content>
						<p>This is text...</p>
						<a href="##" target="_blank">Link</a>
					</accordion-item-content>
				</accordion-item>
			</accordion>
		`;
		var expected = `
			<table class="accordion">
				<tr>
					<td class="accordion-inner">
						<table>
							<tr>
								<td>
									<label class="accordion-element">
										<!--[if !mso | IE]><!-->
										<input type="checkbox" class="accordion-checkbox" style="display: none;">
										<!--<![endif]-->
										<div>
											<div class="accordion-title">
												<table>
													<tr>
														<td class="accordion-header" valign="middle">Accordion #1</td>
														<!--[if !mso | IE]><!-->
														<td class="accordion-ico" valign="middle">
															<img class="accordion-more" src="{{image-path}}icons/arrow-more.png" alt="+">
															<img class="accordion-less" src="{{image-path}}icons/arrow-less.png" alt="-">
														</td>
														<!--<![endif]-->
													</tr>
												</table>
											</div>
											<div class="accordion-content">
												<table>
													<tr>
														<td>
															<p>This is text...</p>
															<a href="##" target="_blank">Link</a>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</label>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;

		compare(input, expected);
	})

	it('creates a accordion with three items', () => {
		var input = `
			<accordion>
				<accordion-item>
					<accordion-item-header iconMoreSrc="{{image-path}}icons/arrow-more.png" iconLessSrc="{{image-path}}icons/arrow-less.png">Accordion #1</accordion-item-header>
					<accordion-item-content>
						<p>This is text for 1...</p>
						<a href="##" target="_blank">Link 1</a>
					</accordion-item-content>
				</accordion-item>
				<accordion-item>
					<accordion-item-header iconMoreSrc="{{image-path}}icons/arrow-more.png" iconLessSrc="{{image-path}}icons/arrow-less.png">Accordion #2</accordion-item-header>
					<accordion-item-content>
						<p>This is text for 2...</p>
						<a href="##" target="_blank">Link 2</a>
					</accordion-item-content>
				</accordion-item>
				<accordion-item>
					<accordion-item-header iconMoreSrc="{{image-path}}icons/arrow-more.png" iconLessSrc="{{image-path}}icons/arrow-less.png">Accordion #3</accordion-item-header>
					<accordion-item-content>
						<p>This is text for 3...</p>
						<a href="##" target="_blank">Link 3</a>
					</accordion-item-content>
				</accordion-item>
			</accordion>
		`;
		var expected = `
			<table class="accordion">
				<tr>
					<td class="accordion-inner">
						<table>
							<tr>
								<td>
									<label class="accordion-element">
										<!--[if !mso | IE]><!-->
										<input type="checkbox" class="accordion-checkbox" style="display: none;">
										<!--<![endif]-->
										<div>
											<div class="accordion-title">
												<table>
													<tr>
														<td class="accordion-header" valign="middle">Accordion #1</td>
														<!--[if !mso | IE]><!-->
														<td class="accordion-ico" valign="middle">
															<img class="accordion-more" src="{{image-path}}icons/arrow-more.png" alt="+">
															<img class="accordion-less" src="{{image-path}}icons/arrow-less.png" alt="-">
														</td>
														<!--<![endif]-->
													</tr>
												</table>
											</div>
											<div class="accordion-content">
												<table>
													<tr>
														<td>
															<p>This is text for 1...</p>
															<a href="##" target="_blank">Link 1</a>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</label>
								</td>
							</tr>
							<tr>
								<td>
									<label class="accordion-element">
										<!--[if !mso | IE]><!-->
										<input type="checkbox" class="accordion-checkbox" style="display: none;">
										<!--<![endif]-->
										<div>
											<div class="accordion-title">
												<table>
													<tr>
														<td class="accordion-header" valign="middle">Accordion #2</td>
														<!--[if !mso | IE]><!-->
														<td class="accordion-ico" valign="middle">
															<img class="accordion-more" src="{{image-path}}icons/arrow-more.png" alt="+">
															<img class="accordion-less" src="{{image-path}}icons/arrow-less.png" alt="-">
														</td>
														<!--<![endif]-->
													</tr>
												</table>
											</div>
											<div class="accordion-content">
												<table>
													<tr>
														<td>
															<p>This is text for 2...</p>
															<a href="##" target="_blank">Link 2</a>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</label>
								</td>
							</tr>
							<tr>
								<td>
									<label class="accordion-element">
										<!--[if !mso | IE]><!-->
										<input type="checkbox" class="accordion-checkbox" style="display: none;">
										<!--<![endif]-->
										<div>
											<div class="accordion-title">
												<table>
													<tr>
														<td class="accordion-header" valign="middle">Accordion #3</td>
														<!--[if !mso | IE]><!-->
														<td class="accordion-ico" valign="middle">
															<img class="accordion-more" src="{{image-path}}icons/arrow-more.png" alt="+">
															<img class="accordion-less" src="{{image-path}}icons/arrow-less.png" alt="-">
														</td>
														<!--<![endif]-->
													</tr>
												</table>
											</div>
											<div class="accordion-content">
												<table>
													<tr>
														<td>
															<p>This is text for 3...</p>
															<a href="##" target="_blank">Link 3</a>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</label>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		`;

		compare(input, expected);
	})
})

describe('raw', () => {
  it('creates a wrapper that ignores anything inside', () => {
    var input = `<raw><<LCG Program\TG LCG Coupon Code Default='246996'>></raw>`;
    var expected = `<<LCG Program\TG LCG Coupon Code Default='246996'>>`;

    compare(input, expected);
  });
});

