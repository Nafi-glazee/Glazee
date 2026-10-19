/* Shared, browser-safe helpers for both staff panels. */
(function (root) {
  function digits(value) {
    return String(value == null ? '' : value).replace(/[০-৯]/g, c => String('০১২৩৪৫৬৭৮৯'.indexOf(c)));
  }
  function money(value) {
    const text = digits(value).replace(/[৳,\s]/g, '').replace(/(?:tk|taka|টাকা)$/i, '');
    return text !== '' && /^\d+$/.test(text) ? Number(text) : null;
  }
  function parseCustomer(text) {
    const fields = {};
    const aliases = { name:'customer_name', 'customer name':'customer_name', 'নাম':'customer_name', phone:'customer_phone', number:'customer_phone', mobile:'customer_phone', 'phone number':'customer_phone', 'নাম্বার':'customer_phone', 'নম্বর':'customer_phone', 'ফোন':'customer_phone', address:'customer_address', 'ঠিকানা':'customer_address', delivery:'delivery_charge', 'delivery charge':'delivery_charge', 'ডেলিভারি চার্জ':'delivery_charge', zone:'shipping_zone', 'delivery zone':'shipping_zone', 'এলাকা':'shipping_zone', note:'note', 'নোট':'note' };
    const lines = String(text).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    const labeled = lines.some(line => aliases[line.split(/[:：]/)[0].trim().toLowerCase()]);
    let last;
    if (labeled) {
      for (const line of lines) {
        const match = line.match(/^([^:：]+)[:：]\s*(.*)$/);
        const key = match && aliases[match[1].trim().toLowerCase()];
        if (key) { fields[key] = match[2]; last = key; }
        else if (last === 'customer_address' || last === 'note') fields[last] += '\n' + line;
      }
    } else {
      ['customer_name','customer_phone','customer_address','delivery_charge','shipping_zone','note'].forEach((key,i) => { if (lines[i] !== undefined) fields[key] = lines[i]; });
      if (lines.length > 6) fields.note += '\n' + lines.slice(6).join('\n');
    }
    if (fields.customer_phone !== undefined) fields.customer_phone = digits(fields.customer_phone).replace(/[\s()-]/g, '');
    if (fields.delivery_charge !== undefined) {
      const charge = money(fields.delivery_charge);
      if (charge === null) throw new Error('Delivery charge: শুধু সংখ্যায় লিখুন (যেমন 80)।');
      fields.delivery_charge = charge;
    }
    if (fields.shipping_zone !== undefined) {
      const zone = fields.shipping_zone.toLowerCase();
      if (/outside|বাইরে/.test(zone)) fields.shipping_zone = 'outside';
      else if (/inside|ভিতরে/.test(zone)) fields.shipping_zone = 'inside';
      else throw new Error('Delivery zone: inside অথবা outside লিখুন।');
    }
    return fields;
  }
  function orderPayload(fields, lines, exchange) {
    return { customer_name:String(fields.customer_name || '').trim(), customer_phone:digits(fields.customer_phone || '').replace(/[\s()-]/g, ''), customer_address:String(fields.customer_address || '').trim(), shipping_zone:fields.shipping_zone, delivery_charge:Number(fields.delivery_charge), note:String(fields.note || '').trim(), is_exchange:!!exchange, lines:lines.map(l => ({ product_id:l.product_id, size:l.size, quantity:Number(l.quantity), price:Number(l.price) })) };
  }
  function inCategory(product, category) { return !category || (product.category || 'Other') === category; }
  root.GZStaffTools = { digits, parseCustomer, orderPayload, inCategory };
})(globalThis);