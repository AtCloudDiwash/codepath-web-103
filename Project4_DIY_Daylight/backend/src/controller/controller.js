import supabase from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const TABLE = process.env.TABLE_NAME;

export async function getAllLamps(req, res) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
}

export async function getLampById(req, res) {
  const { id } = req.params;

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  return res.status(200).json({ data });
}

export async function createLamp(req, res) {
  const { name, bulb_type, shade_style, base_material, color_temp, brightness, total_price } = req.body;

  if (!name || !bulb_type || !shade_style || !base_material || !color_temp || !brightness) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Incompatibility rules
  if (bulb_type === 'Incandescent' && brightness === 'Ultra') {
    return res.status(400).json({ error: 'Incandescent bulbs cannot be used with Ultra brightness — fire hazard!' });
  }
  if (shade_style === 'No Shade' && color_temp === 'RGB') {
    return res.status(400).json({ error: 'No Shade with RGB color is not allowed — too much glare!' });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ name, bulb_type, shade_style, base_material, color_temp, brightness, total_price }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ data });
}

export async function updateLamp(req, res) {
  const { id } = req.params;
  const { name, bulb_type, shade_style, base_material, color_temp, brightness, total_price } = req.body;

  // Incompatibility rules
  if (bulb_type === 'Incandescent' && brightness === 'Ultra') {
    return res.status(400).json({ error: 'Incandescent bulbs cannot be used with Ultra brightness — fire hazard!' });
  }
  if (shade_style === 'No Shade' && color_temp === 'RGB') {
    return res.status(400).json({ error: 'No Shade with RGB color is not allowed — too much glare!' });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update({ name, bulb_type, shade_style, base_material, color_temp, brightness, total_price })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ data });
}

export async function deleteLamp(req, res) {
  const { id } = req.params;

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ message: 'Lamp deleted successfully.' });
}
