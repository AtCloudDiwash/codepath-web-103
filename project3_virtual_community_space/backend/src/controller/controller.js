import supabase from "../config/db.js";

const tableName = "music_events";

export async function getAllEventsController(req, res) {
    const { data, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) {
        console.error(error);
        return res.status(500).json({error: error.message}) // verbose for devs, not to be done in production
    } else {
        return res.status(200).json({data});
    }
}

export async function getFilteredEvents(req, res) {
    const { city, bandname, category } = req.query;

    let query = supabase.from(tableName).select('*');

    if (city) query = query.eq('city', city);
    if (bandname) query = query.eq('band_name', bandname);
    if (category) query = query.eq('category', category);

    const { data, error } = await query;

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
}

export async function getEventDetail(req, res){
    const { eventName } = req.params;

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('title', eventName)
        .single();

    if (error) {
        return res.status(404).json({ error: error.message });
    }

    return res.status(200).json({ data });
}
