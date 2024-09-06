const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getPreferences = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}/preferences`);
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
};

const addPreference = async (userId, preference) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preference),
    });
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
};

const updatePreferences = async (userId, preferences) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}/preferences`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preferences),
    });
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
};

const deletePreference = async (userId, preferenceId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userId}/preferences/${preferenceId}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export { getPreferences, addPreference, updatePreferences, deletePreference };
