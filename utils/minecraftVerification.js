// ===========================
// MINECRAFT USERNAME VERIFICATION
// ===========================

const axios = require('axios');

const MINECRAFT_API_URL = 'https://api.mojang.com';

// Get Minecraft UUID from username
exports.getMinecraftUUID = async (username) => {
  try {
    const response = await axios.get(`${MINECRAFT_API_URL}/users/profiles/minecraft/${username}`);

    if (response.data) {
      return {
        success: true,
        username: response.data.name,
        uuid: response.data.id,
      };
    }

    return { success: false, message: 'Minecraft user not found' };
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, message: 'Minecraft user not found' };
    }
    console.error('Minecraft API error:', error);
    return { success: false, message: 'Failed to verify Minecraft username' };
  }
};

// Get Minecraft username from UUID
exports.getMinecraftUsername = async (uuid) => {
  try {
    // Format UUID with dashes
    const formattedUUID = uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');

    const response = await axios.get(`${MINECRAFT_API_URL}/user/profiles/${formattedUUID}/names`);

    if (response.data && response.data.length > 0) {
      // Get the last entry which is the current username
      const currentUsername = response.data[response.data.length - 1].name;
      return {
        success: true,
        username: currentUsername,
        history: response.data,
      };
    }

    return { success: false, message: 'Minecraft profile not found' };
  } catch (error) {
    console.error('Minecraft API error:', error);
    return { success: false, message: 'Failed to fetch Minecraft username' };
  }
};

// Verify Minecraft username format
exports.verifyMinecraftUsername = (username) => {
  try {
    if (!username || username.trim().length < 3) {
      return { valid: false, message: 'Minecraft username must be at least 3 characters' };
    }

    if (username.length > 16) {
      return { valid: false, message: 'Minecraft username cannot exceed 16 characters' };
    }

    // Minecraft usernames can contain letters, numbers, and underscores
    const minecraftUsernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!minecraftUsernameRegex.test(username)) {
      return { valid: false, message: 'Invalid Minecraft username format' };
    }

    return { valid: true, username: username };
  } catch (error) {
    console.error('Minecraft verification error:', error);
    return { valid: false, message: 'Failed to verify Minecraft username' };
  }
};

// Get Minecraft player skin and profile data
exports.getMinecraftProfile = async (username) => {
  try {
    // First get the UUID
    const uuidResponse = await axios.get(
      `${MINECRAFT_API_URL}/users/profiles/minecraft/${username}`
    );

    if (!uuidResponse.data) {
      return { success: false, message: 'Minecraft user not found' };
    }

    const uuid = uuidResponse.data.id;
    const formattedUUID = uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');

    // Get profile data
    const profileResponse = await axios.get(
      `https://sessionserver.mojang.com/session/minecraft/profile/${formattedUUID}`
    );

    return {
      success: true,
      username: profileResponse.data.name,
      uuid: uuid,
      profile: profileResponse.data,
    };
  } catch (error) {
    console.error('Minecraft profile error:', error);
    return { success: false, message: 'Failed to fetch Minecraft profile' };
  }
};
